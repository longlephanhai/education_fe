import React from 'react';
import './Footer.scss';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__logo">
          <h2>LongTalk</h2>
          <p>Học tiếng Anh một cách dễ dàng và hiệu quả với LongTalk.</p>
        </div>
        <div className="footer__links">
          <ul>
            <li><a href="#">Giới thiệu</a></li>
            <li><a href="#">Khóa học</a></li>
            <li><a href="#">Liên hệ</a></li>
            <li><a href="#">Chính sách bảo mật</a></li>
            <li><a href="#">Câu hỏi thường gặp</a></li>
          </ul>
        </div>
        <div className="footer__contact">
          <h4>Liên hệ</h4>
          <p>Email: support@learnplus.com</p>
          <p>Phone: (+84) 123 456 789</p>
          <p>Địa chỉ: 123 Đường ABC, Quận Ngũ Hành Sơn, TP. Đà Nẵng, Việt Nam</p>
        </div>
        <div className="footer__social">
          <a href="#" className="footer__social-icon"><FaFacebookF /></a>
          <a href="#" className="footer__social-icon"><FaTwitter /></a>
          <a href="#" className="footer__social-icon"><FaInstagram /></a>
          <a href="#" className="footer__social-icon"><FaLinkedinIn /></a>
        </div>
      </div>
      <div className="footer__bottom">
        <p>&copy; 2024 LongTalk. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
