"use client";
import React, { useState } from "react";
import {
  BellIcon,
  ArrowRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import {
  Button,
  Menu,
  MenuItem,
  Typography,
  Avatar,
  Card,
} from "@material-tailwind/react";

type NavbarProps = {
  onToggleSidebar: () => void;
  currentPage: string;
  profileName: string;
  profileImage?: string;
  isSidebarOpen: boolean;
};

export default function NavbarAdmin({
  isSidebarOpen,
  onToggleSidebar,
  currentPage,
  profileName,
  profileImage = "/images/default-avatar.jpg",
}: NavbarProps) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white shadow-md">
      {/* Left - Sidebar Toggle + Page Title */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="text-black hover:text-gray-600 transition-all duration-300"
        >
          {isSidebarOpen ? (
            <XMarkIcon className="h-5 w-5 rotate-180 text-dark3" />
          ) : (
            <ArrowRightIcon className="h-5 w-5 text-dark3" />
          )}
        </button>
        <h1 className="text-lg font-semibold capitalize text-gray-800">
          {currentPage}
        </h1>
      </div>

      {/* Right - Notification & Profile */}
      <div className="flex items-center gap-4">
        {/* Notification */}
        <Menu open={notifOpen} handler={setNotifOpen} placement="bottom-end">
          <Button
            onClick={() => setNotifOpen((prev) => !prev)}
            variant="text"
            className="p-1"
          >
            <BellIcon className="h-6 w-6 text-gray-700" />
          </Button>
          {notifOpen && (
            <div className="absolute z-50 mt-2 w-72 bg-white rounded-md shadow-md border">
              <div className="px-4 py-2 border-b">
                <Typography variant="small" className="text-gray-700">
                  Notifikasi
                </Typography>
              </div>
              <MenuItem onClick={() => setNotifOpen(false)}>
                🔔 Notifikasi 1
              </MenuItem>
              <MenuItem onClick={() => setNotifOpen(false)}>
                📦 Pesanan baru
              </MenuItem>
              <MenuItem onClick={() => setNotifOpen(false)}>
                💬 Chat masuk
              </MenuItem>
            </div>
          )}
        </Menu>

        {/* Profile Dropdown */}
        <Menu
          open={profileOpen}
          handler={setProfileOpen}
          placement="bottom-end"
        >
          <Button
            onClick={() => setProfileOpen((prev) => !prev)}
            variant="text"
            className="p-0"
          >
            <Avatar
              src={profileImage}
              alt="Profile"
              size="sm"
              className="border border-gray-300"
            />
          </Button>
          {profileOpen && (
            <div className="absolute z-50 mt-2 w-56 bg-white rounded-md shadow-md border">
              <Card shadow={false} className="p-4 border-b">
                <Typography variant="h6" className="mb-1">
                  {profileName}
                </Typography>
                <Typography variant="small" color="gray">
                  Admin
                </Typography>
              </Card>
              <MenuItem onClick={() => setProfileOpen(false)}>
                Profil Saya
              </MenuItem>
              <MenuItem onClick={() => setProfileOpen(false)}>Akun</MenuItem>
              <MenuItem onClick={() => setProfileOpen(false)}>Logout</MenuItem>
            </div>
          )}
        </Menu>
      </div>
    </div>
  );
}
