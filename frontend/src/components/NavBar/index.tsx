import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FolderIcon from '@mui/icons-material/Folder';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useRouter } from "next/router";
import Link from "next/link";

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const pages: NavBarRouter[] = [
    {
      name: "แนวข้อสอบ",
      routerPath: "/guideline"
    },
  ];
  const settings: NavBarRouter[] = [
    {
      name: "โปรไฟล์ของฉัน",
      routerPath: "/myProfile",
      icon: <AccountCircleIcon />
    },
    {
      name: "รายการที่ต้องทำ",
      routerPath: "/todolist",
      icon: <FormatListBulletedIcon />
    },
    {
      name: "ออกจากระบบ",
      routerPath: "/login",
      icon: <ExitToAppIcon />
    },
  ];

  const route = useRouter()

  return (
    <AppBar position="static" className="bg-white drop-shadow-sm inline-block relative z-10 w-screen">
      <Container maxWidth="xl">
        <Toolbar disableGutters className="flex h-full h-full">
          <img src="/logo.png" onClick={() => route.push("/")} className="w-40 hidden sm:block cursor-pointer" />
          <Box className="flex grow sm:hidden">
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              className="block sm:hidden"
            >
              {pages.map((page, index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <img src="/logo.png" onClick={() => route.push("/")} className="w-40 sm:hidden cursor-pointer" />

          <Box className="flex grow justify-end items-center">
            <div className="flex gap-4 mr-4">
              {pages.map((page, index) => (
                <Link href={page.routerPath} className="no-underline" key={index}>
                  <Button variant="contained" color="info" className="text-white bg-orange">
                    <Typography key={index}>{page.name}</Typography>
                  </Button>
                </Link>
              ))}
            </div>
            <IconButton onClick={handleOpenUserMenu}>
              <Avatar alt="" src="" />
            </IconButton>

            <Menu
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              className="mt-12"
            >
              {settings.map((setting, index) => (
                <Link href={setting.routerPath} className="no-underline text-black">
                  <MenuItem key={index} onClick={handleCloseUserMenu} className="flex gap-2 justify-end h-12">
                    <p>{setting.name}</p>
                    {setting.icon}
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;  