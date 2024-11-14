import React, { useEffect } from 'react'
import { CiSettings } from 'react-icons/ci'
import { useNavigate } from 'react-router'
import useAuthUser from '../../hooks/useAuthUser'
import { formatMemberSinceDate } from '../../utils/date'
import { formatName } from '../../utils/formatName'

const Dashboard = () => {
  const navigate = useNavigate()
  const { authUser, isLoading, isError } = useAuthUser()
  useEffect(() => {
    if (!authUser && !isLoading && !isError) navigate('/')
  }, { authUser })
  return (
    <div className="min-h-screen">
      <div className="flex flex-col p-5">
        <div className="avatar placeholder items-center gap-3 mx-auto my-3">
          <div className="bg-neutral text-neutral-content w-24 rounded-full">
            <span className="text-3xl">
              {
                formatName(authUser)
              }
            </span>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center">
          <CiSettings className='text-xl' />
          <h2 className="text-2xl text-neutral-content p-3">
            Settings
          </h2>
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
            <span className="badge badge-info cursor-pointer p-3">
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
      </div>
    </div>
  )
}

export default Dashboard