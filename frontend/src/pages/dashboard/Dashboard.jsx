import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { CiSettings } from 'react-icons/ci'
import { useNavigate } from 'react-router'
import Loader from '../../components/common/Loader'
import useAuthUser from '../../hooks/useAuthUser'
import { formatMemberSinceDate } from '../../utils/date'
import { formatName } from '../../utils/formatName'

const Dashboard = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { authUser, isLoading, isError: isAuthUserError } = useAuthUser()
  const [code, setCode] = useState(new Array(6).fill(''))
  const [cooldown, setCooldown] = useState(0)

  const handleInputChange = (e, index) => {
    const value = e.target.value.slice(-1);
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < 5) {
      document.getElementById(`code-input-${index + 1}`).focus();
    }
  }
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      // Move focus to the previous input
      document.getElementById(`code-input-${index - 1}`).focus();
    }
  }
  const { mutate: verifyEmail, isPending, isError } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("/api/auth/verify-email", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code: code.join('') })
        })
        const data = await res.json()
        if (!res.ok) {
          throw new Error(data.error)
        }
        return data
      } catch (error) {
        throw new Error(error)
      }
    },
    onSuccess: () => {
      toast.success("Account verified")
      queryClient.invalidateQueries(['authUser'])
      document.getElementById('verify_email_modal').close()
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })
  const { mutate: getNewToken, isPending: gettingNewToken, isError: errorGettingNewToken } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("/api/auth/newVerificationToken", {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email: authUser.email })
        })
        const data = await res.json()
        if (!res.ok) {
          throw new Error(data.error)
        }
        return data
      } catch (error) {
        throw new Error(error)
      }
    },
    onSuccess: () => {
      toast.success("New verification token sent")
      setCooldown(300) // Start a 5-minute cooldown
      queryClient.invalidateQueries(['authUser'])
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })
  const { mutate: deleteAccount, isPending: deletingAccount, isError: errorDeleting } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("/api/auth/delete", {
          method: 'DELETE',
        })
        const data = await res.json()
        if (!res.ok) {
          throw new Error(data.error) || "something went wrong"
        }
        return data
      } catch (error) {
        throw new Error(error)
      }
    },
    onSuccess: () => {
      toast.success("Account deleted")
      queryClient.invalidateQueries({ queryKey: ['authUser'] })
    },
    onError: (error) => {
      toast.error(error.message) || "something went wrong"
    }
  })
  useEffect(() => {
    if (!authUser && !isLoading && !isAuthUserError) navigate('/')
  }, [authUser, isLoading, isAuthUserError, navigate])
  useEffect(() => {
    if (cooldown > 0) {
      const interval = setInterval(() => {
        setCooldown(prev => prev - 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [cooldown])
  const formatCooldown = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen">
      <div className="flex flex-col p-5 gap-2">
        <div className="avatar placeholder items-center gap-3 mx-auto my-3">
          <div className="bg-neutral text-neutral-content w-24 rounded-full">
            <span className="text-3xl">
              {formatName(authUser)}
            </span>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center">
          <CiSettings className='text-xl' />
          <h2 className="text-2xl text-neutral-content p-3">Settings</h2>
        </div>
        <label className="input input-bordered flex items-center gap-2">
          Name
          <input
            type="text"
            className="grow"
            placeholder="Daisy"
            value={authUser.name}
            disabled
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Email
          <input
            type="text"
            className="grow"
            placeholder="daisy@site.com"
            value={authUser.email}
            disabled
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className={`grow ${authUser.isVerified ? 'placeholder:text-primary' : 'placeholder:text-red-500'} `}
            placeholder={authUser.isVerified ? 'Verified' : 'Account not verified'}
            disabled
          />
          {
            !authUser.isVerified &&
            <span
              onClick={() => document.getElementById('verify_email_modal').showModal()}
              className="badge badge-info cursor-pointer p-3"
            >
              Verify
            </span>
          }
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Search"
            value={formatMemberSinceDate(authUser.createdAt)}
            disabled
          />
        </label>
        <button disabled={deletingAccount} onClick={deleteAccount} className="btn bg-red-500 my-1 text-white">
          {
            deletingAccount ? (
              <Loader s='md' />
            ) : 'Delete this Account'
          }
        </button>
      </div>
      <dialog id="verify_email_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg my-3">Enter the code sent to your E-mail</h3>
          <div className="flex gap-2 justify-center my-3">
            {code.map((char, index) => (
              <input
                key={index}
                id={`code-input-${index}`}
                type="text"
                maxLength="1"
                value={char}
                className="input input-bordered w-11 text-center"
                onChange={(e) => handleInputChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>
          <button
            onClick={() => getNewToken()}
            className="btn my-3"
            disabled={cooldown > 0}
          >
            {cooldown > 0 ? `Resend in ${formatCooldown(cooldown)}` : (gettingNewToken ? 'Sending token' : 'Resend token')}
          </button>
          <div className="modal-action">
            <button
              className="btn"
              onClick={() => verifyEmail()}
              disabled={isPending || code.includes('')}
            >
              {isPending ? 'Verifying...' : 'Submit'}
            </button>
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default Dashboard
