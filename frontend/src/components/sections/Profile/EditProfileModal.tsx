import React, { useEffect, useState } from 'react'
import { Modal } from '@/components/common/Modal'
import { User, Mail, MapPin, Upload } from 'lucide-react'
import type { UserProfile } from '@/types/UserProfileType'
import { z } from "zod";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateMe } from '@/services/providers/api/authApi';
import { toast } from 'sonner';

type EditProfileModalProps = {
    isOpen: boolean
    onClose: () => void
    profile: UserProfile
}

const schema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters long"),
    email: z.email("Invalid email address"),
    address: z.string().min(3, "Address must be at least 3 characters long"),
})

type FormFields = z.infer<typeof schema>;

const EditProfileModal = ({ isOpen, onClose, profile }: EditProfileModalProps) => {
    const { username, email, address } = profile;

    const queryClient = useQueryClient();
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormFields>({
        resolver: zodResolver(schema),
        defaultValues: {
            username,
            email,
            address,
        },
    });

    useEffect(() => {
        if (isOpen) {
            reset({
                username,
                email,
                address,
            });
            setAvatarFile(null);
            setAvatarPreview(null);
        }
    }, [isOpen, profile, reset])


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatarFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleClose = () => {
        setAvatarPreview(null);
        setAvatarFile(null);
        onClose();
    };

    const updateMutation = useMutation({
        mutationFn: updateMe,

        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["me"] });
            toast.success("Profile updated successfully!");
            handleClose();
        },

        onError: () => {
            toast.error("Failed to update profile");
        }
    })

    const onSubmit = (data: FormFields) => {
        const { username, email, address } = data;
        updateMutation.mutate({
            username,
            email,
            address,
            avatar: avatarFile ?? undefined
        })
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="Edit Profile"
            description="Update your driver details and upload a new profile picture."
            size="md"
            footer={
                <>
                    <button
                        type="button"
                        disabled={updateMutation.isPending}
                        className="cursor-pointer rounded-lg border border-white/20 px-5 py-2 font-akshar text-white transition-colors duration-300 hover:bg-white hover:text-black"
                        onClick={handleClose}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={updateMutation.isPending}
                        onClick={handleSubmit(onSubmit)}
                        className="cursor-pointer rounded-lg bg-[#F90301] px-5 py-2 font-akshar text-white transition-colors duration-300 hover:bg-[#aa0303]"
                    >
                        {updateMutation.isPending ? "Saving..." : "Save Changes"}
                    </button>
                </>
            }
        >
            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} id='editProfileForm'>
                <div className="flex flex-col items-center gap-4 border-b border-white/5 pb-4">
                    <div className="relative group">
                        <img
                            src={avatarPreview || profile.avatar}
                            alt="Avatar preview"
                            className="size-24 rounded-lg border border-white/10 object-cover"
                        />
                        <label
                            htmlFor="avatar-input"
                            className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-lg bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        >
                            <Upload className="size-6 text-[#F90301]" />
                        </label>
                    </div>
                    <div className="text-center">
                        <label
                            htmlFor="avatar-input"
                            className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-[#F90301]/30 px-3 py-1 text-xs text-[#F90301] hover:bg-[#F90301]/10 transition-colors duration-300"
                        >
                            <Upload className="size-3" />
                            Upload New Image
                        </label>
                        <input
                            id="avatar-input"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                        <p className="mt-1 text-[11px] text-[#747474]">JPG, PNG or WEBP. Max 5MB.</p>
                    </div>
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="username" className="text-xs uppercase tracking-wider text-[#747474]">
                        Username
                    </label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#747474]" />
                        <input
                            {...register("username")}
                            id="username"
                            type="text"
                            placeholder="Enter username"
                            className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-[15px] text-white placeholder-white/20 transition-all duration-300 focus:border-[#F90301] focus:bg-white/10 focus:outline-none"
                        />
                    </div>
                    {errors.username && (
                        <p className="text-xs text-red-500">{errors.username.message}</p>
                    )}
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-xs uppercase tracking-wider text-[#747474]">
                        Email Address
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#747474]" />
                        <input
                            {...register("email")}
                            id="email"
                            type="email"
                            placeholder="Enter email address"
                            className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-[15px] text-white placeholder-white/20 transition-all duration-300 focus:border-[#F90301] focus:bg-white/10 focus:outline-none"
                        />
                    </div>
                    {errors.email && (
                        <p className="text-xs text-red-500">{errors.email.message}</p>
                    )}
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="address" className="text-xs uppercase tracking-wider text-[#747474]">
                        Address
                    </label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#747474]" />
                        <input
                            {...register("address")}
                            id="address"
                            type="text"
                            placeholder="Enter your address"
                            className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-[15px] text-white placeholder-white/20 transition-all duration-300 focus:border-[#F90301] focus:bg-white/10 focus:outline-none"
                        />
                    </div>
                    {errors.address && (
                        <p className="text-xs text-red-500">{errors.address.message}</p>
                    )}
                </div>
            </form>
        </Modal>
    )
}

export default EditProfileModal
