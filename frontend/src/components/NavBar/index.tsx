import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FolderIcon from '@mui/icons-material/Folder';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useRouter } from "next/router";

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
      routerPath: ""
    },
  ];
  const settings: NavBarRouter[] = [
    {
      name: "หน้าหลัก",
      routerPath: "",
      icon: <AccountCircleIcon />
    },
    {
      name: "โฟลเดอร์ของฉัน",
      routerPath: "",
      icon: <FolderIcon />
    },
    {
      name: "รายการที่ต้องทำ",
      routerPath: "",
      icon: <FormatListBulletedIcon />
    },
    {
      name: "ออกจากระบบ",
      routerPath: "",
      icon: <ExitToAppIcon />
    },
  ];

  const route = useRouter()

  return (
    <AppBar position="static" className="bg-white drop-shadow-sm inline-block relative z-10">
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
          <Box className="flex grow sm:block hidden">
            {pages.map((page, index) => (
              <Typography variant="infoText">{page.name}</Typography>
            ))}
          </Box>

          <Box className="flex grow justify-end">
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
                <MenuItem key={index} onClick={handleCloseUserMenu} className="flex gap-2 justify-end h-12">
                  <p>{setting.name}</p>
                  {setting.icon}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;