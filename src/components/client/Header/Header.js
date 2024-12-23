/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import './Header.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import Summary from '../../../API';
import { RxAvatar } from "react-icons/rx";
import { Dropdown, Space, Tour } from 'antd';
import { FaUser } from "react-icons/fa";
import { TbVocabulary } from "react-icons/tb";
import { AiOutlineSolution } from "react-icons/ai";
import { setRefs, setTourSteps } from '../../../action/tour.action';
import { starTour } from '../../../action/startTour.action';
const Header = () => {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const checkToken = localStorage.getItem('access_token');
  const [token, setToken] = useState(checkToken);
  const dispatch = useDispatch();
  const handleLogout = () => {
    try {
      localStorage.removeItem('access_token');
      setToken(null);
      toast.success('Đăng xuất thành công!');
      dispatch({ type: 'LOGOUT' });
      setUser({})
    } catch (error) {
      console.log(error);
    }
  }
  const [user, setUser] = useState({})
  const isLogin = useSelector((state) => state.login)


  const checkUser = async () => {
    try {
      const fetchApi = await axios.get(Summary.getProfile.url, {
        headers: {
          'Authorization': `Bearer ${checkToken}`
        }
      })
      if (fetchApi.data.statusCode === 200) {
        setUser(fetchApi.data.data)
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    checkUser()
  }, [isLogin])

  const dispatchTour = useDispatch()
  const items = [
    {
      key: '1',
      label: 'Tài khoản của tôi',
      disabled: true,
    },
    {
      type: 'divider',
    },
    {
      key: '2',
      label: 'Thông tin cá nhân',
      icon: <FaUser />,
      extra: '⌘P',
      onClick: () => navigate('profile'),
    },
    {
      key: '3',
      label: 'Từ vựng đã lưu',
      icon: <TbVocabulary />,
      extra: '⌘B',
      onClick: () => navigate('vocab-save'),
    },
    {
      key: '4',
      label: 'Hướng dẫn sử dụng',
      icon: <AiOutlineSolution />,
      extra: '⌘B',
      onClick: () => dispatchTour(starTour(true)),
    },
  ];
  const ref0 = useRef(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const dispatchRef = useDispatch()
  useEffect(() => {
    dispatchRef(setRefs({ ref1, ref2, ref3 }))

    const steps = [
      {
        title: 'Bạn có thể tải tài liệu học tiếng anh tại đây!',
        description: 'Ấn next để tiếp tục.',
        target: () => ref0?.current,
      },
      {
        title: 'Bắt đầu học tại đây!',
        description: 'Ấn next để tiếp tục.',
        target: () => ref1?.current,
      },
      {
        title: 'Save',
        description: 'Save your changes.',
        target: () => ref2?.current,
      },
      {
        title: 'Other Actions',
        description: 'Click to see other actions.',
        target: () => ref3?.current,
      },
    ];
    dispatchRef(setTourSteps(steps));
  }, [dispatchRef])



  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="header__container">
        <div className="header__logo">
          <a href="/">LongTalk</a>
        </div>
        <nav className={`header__nav ${isMenuOpen ? 'header__nav--active' : ''}`}>
          <ul className="header__nav-list">
            <li><a href="/">Trang chủ</a></li>
            <li><a ref={ref0} href="/documents">Tài liệu</a></li>
            <li><a href="/aboutus">Về chúng tôi</a></li>
            <li><a href="#contact">Liên hệ</a></li>
          </ul>
        </nav>



        {
          token || isLogin ?
            <div className='header__group'>
              {
                user?.avatar ?
                  <Dropdown
                    menu={{
                      items,
                    }}
                    placement="bottom"
                  >
                    <a onClick={(e) => e.preventDefault()}>
                      <Space>
                        <img style={{ cursor: 'pointer' }} className='header__avatar' src={user?.avatar} width={'50px'} height={'50px'} alt='' />
                      </Space>
                    </a>
                  </Dropdown>
                  :

                  <Dropdown
                    menu={{
                      items,
                    }}
                  >
                    <a href='' onClick={(e) => e.preventDefault()}>
                      <Space>
                        <RxAvatar className='header__avatar' />
                      </Space>
                    </a>
                  </Dropdown>
              }
              <button onClick={handleLogout} className="header__login-button">Đăng xuất</button>
            </div>
            :
            <button onClick={() => navigate('auth/login')} className="header__login-button">Đăng nhập</button>
        }
        <button className="header__menu-icon" onClick={toggleMenu}>
          &#9776;
        </button>
      </div>
      {/* <Tour open={open} onClose={() => setOpen(false)} steps={steps} /> */}
    </header>
  );
};

export default Header;
