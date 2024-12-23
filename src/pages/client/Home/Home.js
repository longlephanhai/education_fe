/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import './Home.scss';
import BackGroup from '../../../asset/image/Online-Education-Vector-Illustration.webp';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Tour } from 'antd';

const Home = () => {
  const checkAccessToken = localStorage.getItem('access_token');
  const handlOnClicl = () => {
    toast.error('Vui lòng đăng nhập để tiếp tục');
  }

  const { ref1, ref2, ref3 } = useSelector((state) => state.refReducer)
  const { tourSteps } = useSelector((state) => state.refReducer)
  const [open, setOpen] = useState(false)
  const selector = useSelector((state) => state.tourReducer)
  useEffect(() => {
    setOpen(selector.tourOpen)
  }, [selector])

  const navigate = useNavigate()
  const handleStepChange = (current) => {
    if (current === 2) {
      navigate('practice')
    }
  }


  return (
    <div className="home">
      <div className="home__content">
        <div className="home__text">
          <h1 className="home__title">
            Nâng cao kỹ năng tiếng Anh của bạn với <span>LongTalk</span>
          </h1>
          <p className="home__description">
            Cùng khám phá các khóa học tiếng Anh trực tuyến từ cơ bản đến nâng cao với đội ngũ giảng viên chất lượng và phương pháp học tập hiệu quả.
          </p>
          <div className="home__buttons">
            {
              checkAccessToken
                ?
                <Link ref={ref1} to={'practice'} className="home__button home__button--primary">Bắt đầu học</Link>
                :
                <Link to={'auth/login'} className="home__button home__button--primary" onClick={handlOnClicl}>Bắt đầu học</Link>
            }

            <button className="home__button home__button--secondary">Tìm hiểu thêm</button>
          </div>
        </div>
        <div className="home__image">
          <img src={BackGroup} alt="Online Education" className="home__img" />
        </div>
      </div>
      <Tour
        open={open}
        onClose={() => setOpen(false)}
        steps={tourSteps}
        onChange={handleStepChange}
      />
    </div>
  );
};

export default Home;
