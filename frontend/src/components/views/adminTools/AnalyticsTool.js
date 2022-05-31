import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { MdAdd, MdDelete, MdEdit } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { getAdminDataAction } from '../../../context/store/StoreActions'
import StoreContext from '../../../context/store/StoreContext'
import BrandsForm from '../../shared/forms/BrandsForm'
import Spinner from '../../shared/Spinner'

export const AnalyticsTool = () => {

  const { store, showModal, hideModal, showToast, setData } = useContext(StoreContext)

  const [loading, setLoading] = useState([])
  const [reload, setReload] = useState(false)

  useEffect(() => {
    setLoading(true)
    getAdminDataAction().then((data) => {
      if (!data) {
        showToast('an error occurred, please try again', false)
        setData('products', [])
        setData('users', [])
        setData('orders', [])
        setLoading(false)
      } else {
        console.log(data);
        setData('products', data.products)
        setData('users', data.users)
        setData('orders', data.orders)
        setLoading(false)
      }
    })
  }, [reload])

  return (
    <>
      {loading
        ? (
          <Spinner />
        )
        : (
          <div className='grid place-items-center mb-3'>
            <h1 className='text-left text-xl font-medium p-6 text-gray-700'>Analytics Data</h1>
            <div className='max-w-2xl px-6'>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Data
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                        Users Count [Admins/users]
                      </th>
                      <td className="px-6 py-4">
                        {store.appData.users.filter(user => user.type === 'Admin').length} / {store.appData.users.filter(user => user.type !== 'Admin').length}
                      </td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                        Products Count [featured/total]
                      </th>
                      <td className="px-6 py-4">
                        {store.appData.products.filter(product => product.isFeatured).length} / {store.appData.products.length}
                      </td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                        Orders Count [Count/Value]
                      </th>
                      <td className="px-6 py-4">
                        {store.appData.orders.length} / {store.appData.orders.length}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        )}
    </>
  )
}
