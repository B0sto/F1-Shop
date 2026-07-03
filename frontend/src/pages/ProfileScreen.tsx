import {User} from "lucide-react"
import {useState} from "react"

import SectionTitle from "@/components/common/SectionTitle"
import ProfileCard from "@/components/sections/Profile/ProfileCard"
import RecentPurchases from "@/components/sections/Profile/RecentPurchases"
import type {UserProfile} from "@/types/UserProfileType"
import type {Purchase} from "@/types/PurchaseType"
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query"
import {recentPurchasesQuery} from "@/services/providers/queries/checkoutQueries"
import {meQuery} from "@/services/providers/queries/authQueries"
import EditProfileModal from "@/components/sections/Profile/EditProfileModal"
import {useNavigate} from "@tanstack/react-router";
import {deleteMe} from "@/services/providers/api/authApi.ts";
import {authToken} from "@/services/authToken.ts";
import {Modal} from "@/components/common/Modal.tsx";
import {toast} from "sonner";


const ProfileScreen = () => {
    const {data: orders = []} = useQuery(recentPurchasesQuery)
    const {data: user} = useQuery(meQuery);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const profile: UserProfile = {
        _id: user?.id || "",
        username: user?.username || "Driver",
        email: user?.email || "",
        address: user?.address || "No address provided",
        memberSince: user?.createdAt
            ? new Date(user.createdAt).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
            })
            : "N/A",
        totalSpent: user?.totalSpent ?? 0,
        avatar: user?.avatar || `https://ui-avatars.com/api/?name=${user?.username}&background=F90301&color=fff&size=256`

    }

    const deleteMutation = useMutation({
        mutationFn: deleteMe,
        onSuccess: () => {
            authToken.set(null);
            queryClient.clear();
            toast.success("User deleted successfully.");
            navigate({to: "/home"})
        }
    })

    const handleDelete = () => {
        deleteMutation.mutate();
    }

    const purchases: Purchase[] = orders
        .flatMap((order) =>
            order.items.map((item) => ({
                id: `F1-${order._id.slice(0, 5).toUpperCase()}`,
                key: `${order._id}-${item.productId}`,
                orderId: order._id,
                name: item.name,
                date: new Date(order.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                }),
                price: `$${item.totalPrice}.00`,
                status: "Delivered" as const,
                image: item.image,
            }))
        )
        .slice(0, 3);

    const totalOrdersCount = orders.length;

    return (
        <section
            className="min-h-full px-4 py-8 font-akshar text-white sm:px-8 sm:py-10 lg:px-12 lg:py-12 xl:px-16 2xl:px-36">
            <div className="mx-auto w-full max-w-350">
                <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <SectionTitle title="Profile" className="text-white"/>

                    <div className="flex items-center gap-x-5">
                        <button
                            type="button"
                            onClick={() => setIsEditModalOpen(true)}
                            className="inline-flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-white px-4 text-[16px] text-black transition-colors duration-300 hover:bg-[#F90301] hover:text-white sm:w-fit"
                        >
                            <User className="size-4"/>
                            Edit profile
                        </button>

                        <button
                            onClick={() => setIsDeleteModalOpen(true)}
                            className="h-10 rounded-lg bg-red-600 px-4 text-white hover:bg-red-700 cursor-pointer"
                        >
                            Delete account
                        </button>
                    </div>

                </div>

                <ProfileCard profile={profile} totalOrders={totalOrdersCount}/>

                <div className="mt-6 lg:mt-8">
                    <RecentPurchases purchases={purchases}/>
                </div>
            </div>

            <EditProfileModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                profile={profile}
            />

            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Delete account?"
                description="This action cannot be undone."
                size="sm"
                footer={
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={() => setIsDeleteModalOpen(false)}
                            className="rounded bg-white text-black hover:bg-[#d6d6d6] cursor-pointer transition-all duration-300 px-4 py-2"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handleDelete}
                            disabled={deleteMutation.isPending}
                            className="rounded bg-red-600 transition-all duration-300 hover:bg-[#a80303] cursor-pointer px-4 py-2 disabled:opacity-50"
                        >
                            {deleteMutation.isPending ? "Deleting..." : "Delete"}
                        </button>
                    </div>
                }
            >
                <p className="text-sm text-gray-300">
                    Are you sure you want to permanently delete your account?
                </p>
            </Modal>
        </section>
    )
}

export default ProfileScreen


