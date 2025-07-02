import React from 'react';
import { Avatar, Navbar, NavbarBrand, NavbarContent, NavbarItem, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@/hooks/useSession.tsx";
import {Image} from "@heroui/image";
const Header: React.FC = () => {
  const { session, logout } = useSession();
  const navigate = useNavigate();
  const user = session?.user;
  const fallbackAvatar = `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(user?.email || 'venus')}`;
  const avatarUrl = user?.user_metadata?.avatar_url || fallbackAvatar;

  const handleLogout = async () => {
    await logout();
    navigate("/"); // or navigate("/login") depending on your route
  };

  return (
      <Navbar maxWidth="full" className="bg-background/70 backdrop-blur-md">
        <NavbarBrand>
          <Image className="cursor-pointer" src={'/favicon.png'} onClick={() => navigate("/lounge")}/>
          {/*<Icon icon="lucide:layout-dashboard" className="text-primary text-2xl mr-2" />*/}
          <p className="cursor-pointer font-bold text-inherit" onClick={() => navigate("/lounge")}>Nano Portfolio Dashboard</p>
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem>
            <Dropdown>
              <DropdownTrigger>
                <Button variant="light" startContent={<Icon icon="lucide:help-circle" />}>
                  Help
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Help options">
                <DropdownItem key="faq">FAQ</DropdownItem>
                <DropdownItem key="support">Support</DropdownItem>
                <DropdownItem key="contact">Contact Us</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
          <NavbarItem>
            <Dropdown>
              <DropdownTrigger>
                <Button variant="light" startContent={<Icon icon="lucide:globe" />}>
                  Language
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Language options">
                <DropdownItem key="en">English</DropdownItem>
                <DropdownItem key="es">Español</DropdownItem>
                <DropdownItem key="fr">Français</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
          {/*<NavbarItem>*/}
          {/*  <Button*/}
          {/*      color="danger"*/}
          {/*      variant="flat"*/}
          {/*      startContent={<Icon icon="lucide:log-out" />}*/}
          {/*      onClick={handleLogout}*/}
          {/*  >*/}
          {/*    Logout*/}
          {/*  </Button>*/}
          {/*</NavbarItem>*/}
          <NavbarItem>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    src={avatarUrl}
                    name={user?.email}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="User menu" className="w-48">
                <DropdownItem key="profile" onClick={() => navigate("/profile")}>
                  Profile
                </DropdownItem>
                <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>

        </NavbarContent>
      </Navbar>
  );
};

export default Header;
