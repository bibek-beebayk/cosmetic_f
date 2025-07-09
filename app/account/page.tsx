'use client'

import LoadingSpinner from '@/components/LoadingSpinner'
import { useAuth } from '@/context/AuthContext'
import { apiCall } from '@/lib/axios'
import { validatePassword } from '@/lib/utils'
import { UserDetail } from '@/types/auth'
import { Order } from '@/types/order'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaShoppingBag, FaUser } from 'react-icons/fa'

type Tab = 'profile' | 'orders'

// type Err = { data: { detail: string } }

export default function AccountPage() {
    const [activeTab, setActiveTab] = useState<Tab>('profile')
    const { isAuthenticated, isLoading } = useAuth()
    const router = useRouter()
    const [userData, setUserData] = useState<UserDetail>()
    const [ordersData, setOrdersData] = useState<Order[]>([])

    // User Data
    const [showEditModal, setShowEditModal] = useState(false);
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');

    // Password Change fields
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [existingPassword, setExistingPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
        { id: 'profile', label: 'Profile', icon: <FaUser /> },
        { id: 'orders', label: 'Orders', icon: <FaShoppingBag /> },
    ]

    const orders = [
        {
            id: 1001,
            total: 85.99,
            status: 'Delivered',
            date: '2025-07-05',
            items: [
                { name: 'LANEIGE Glowy Balm', quantity: 1, price: 30.0 },
                { name: 'Cleansing Foam', quantity: 2, price: 27.99 },
            ],
        },
    ]

    const fetchUserData = async () => {
        try {

            const res = await apiCall<UserDetail>('get', '/user/me/')
            setUserData(res)
        } catch {
            console.log("Error fetching user data")
        }

    }

    const fetchOrdersData = async () => {
        try {
            const res = await apiCall<Order[]>('get', "/user/orders/")
            setOrdersData(res)
        } catch {
            toast.error("An error occured while fetching orders.")
        }
    }

    useEffect(() => {
        if (!isLoading && isAuthenticated === false) {
            router.replace('/login');
            return
        }
        fetchUserData()
        fetchOrdersData()
    }, [isAuthenticated, isLoading])


    if (isLoading || isAuthenticated === null) {
        return <LoadingSpinner />
    }

    const handleEditClick = () => {
        if (userData) {
            setFullName(userData.full_name || '');
            setPhone(userData.phone || '');
            setShowEditModal(true);
        }
    };

    const handleUpdateProfile = async () => {
        try {
            await apiCall("put", "/user/me/", {
                full_name: fullName,
                phone: phone,
            });
            toast.success("Profile updated.");
            setShowEditModal(false);
            fetchUserData();
        } catch (e) {
            console.error(e)
            toast.error("Failed to update profile.");
        }
    };

    const handleChangePassword = async () => {
        if (!existingPassword || !newPassword || !confirmPassword) {
            toast.error('Please fill in all fields');
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        if (!validatePassword(newPassword)) {
            toast.error('Password must be at least 8 characters and include letters and numbers');
            return;
        }

        try {
            await apiCall("post", "/user/change-password/", {
                old_password: existingPassword,
                new_password: newPassword,
            });

            toast.success("Changed password successfully");
            setShowPasswordModal(false);
            setExistingPassword('');
            setNewPassword('');
            setConfirmPassword('');   
        } 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch (e: any) {
            console.log(e)
            toast.error(e.data.detail);
        }
    };


    return (
        <div className="max-w-5xl mx-auto px-4 py-4">
            {/* <h1 className="text-lg font-bold mb-2">My Account</h1> */}

            {/* Tabs */}
            <div className="flex mb-6 space-x-6 text-sm shadow-lg sticky top-17 bg-white pt-2 justify-center">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 pb-2 border-b-2 ${activeTab === tab.id
                            ? 'border-red-500 text-red-500'
                            : 'border-transparent text-gray-600 hover:text-black'
                            }`}
                    >
                        {tab.icon} {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white border rounded shadow-sm p-6">
                {activeTab === 'profile' && (
                    <div className="space-y-2 text-sm">
                        <h2 className="text-lg font-semibold mb-4">Profile Info</h2>
                        <p><span className="font-medium">Name:</span> {userData?.full_name || "N/A"}</p>
                        <p><span className="font-medium">Email:</span> {userData?.email}</p>
                        <p><span className="font-medium">Phone:</span> {userData?.phone || "N/A"}</p>
                        <div className='flex gap-2'>
                            <button onClick={handleEditClick} className="text-sm text-red-500 hover:underline">Edit Profile</button>
                            <button
                                onClick={() => setShowPasswordModal(true)}
                                className="text-sm text-blue-500 hover:underline"
                            >
                                Change Password
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === 'orders' && (
                    <div className="space-y-4 text-sm">
                        <h2 className="text-lg font-semibold mb-4">My Orders</h2>
                        {orders.length === 0 ? (
                            <p className="text-gray-600">You haven’t placed any orders yet.</p>
                        ) : (
                            ordersData.map((order) => (
                                <div key={order.id} className="border-b pb-4">
                                    <p className="font-medium">Order #{order.id}</p>
                                    <p>Status: <span className="text-blue-600">{order.status.toUpperCase()}</span></p>
                                    <p>Date: {order.created_at.split("T")[0]}</p>
                                    <p>Total: ${order.total_price}</p>
                                    <p>Payment Status: {order.is_paid ? <span className='text-green-600'>Paid</span> : <span className='text-red-600'>Not Paid</span>}</p>
                                    <ul className="list-disc ml-4 text-xs mt-1 text-gray-600">
                                        {order.items.map((item, i) => (
                                            <li key={i}>{item.product_data.name} {item.variant_data && `(${item.variant_data.name})`} {item.shade_data && `(${item.shade_data.name})`} x {item.quantity} – ${item.price * item.quantity}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>


            {showEditModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-md w-full max-w-sm relative">
                        <button
                            onClick={() => setShowEditModal(false)}
                            className="absolute top-2 right-3 text-xl text-gray-500 hover:text-red-500"
                        >
                            ×
                        </button>
                        <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>
                        <div className="space-y-3 text-sm">
                            <div>
                                <label className="block mb-1 font-medium">Full Name</label>
                                <input
                                    type="text"
                                    className="w-full border rounded px-3 py-2"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Phone</label>
                                <input
                                    type="text"
                                    className="w-full border rounded px-3 py-2"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                            <button
                                onClick={handleUpdateProfile}
                                className="w-full mt-4 bg-red-500 text-white py-2 rounded hover:bg-pink-600"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}


            {showPasswordModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-md w-full max-w-sm relative">
                        <button
                            onClick={() => setShowPasswordModal(false)}
                            className="absolute top-2 right-3 text-xl text-gray-500 hover:text-red-500"
                        >
                            ×
                        </button>
                        <h2 className="text-lg font-semibold mb-4">Change Password</h2>
                        <div className="space-y-3 text-sm">
                            <div>
                                <label className="block mb-1 font-medium">Existing Password</label>
                                <input
                                    type="password"
                                    className="w-full border rounded px-3 py-2"
                                    value={existingPassword}
                                    onChange={(e) => setExistingPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">New Password</label>
                                <input
                                    type="password"
                                    className="w-full border rounded px-3 py-2"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Confirm New Password</label>
                                <input
                                    type="password"
                                    className="w-full border rounded px-3 py-2"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <button
                                onClick={handleChangePassword}
                                className="w-full mt-4 bg-red-500 text-white py-2 rounded hover:bg-pink-600"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}
