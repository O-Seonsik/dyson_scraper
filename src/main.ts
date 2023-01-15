import axios from 'axios';
import { JSDOM } from 'jsdom';
import nodemailer from 'nodemailer';


try {
  const url = 'https://www.dyson.co.kr/40mm-airwrap-long-barrel-iron-fuchsia';
  const html = await axios.get(url);
  const el =  new JSDOM(html.data);
  const selector = '#maincontent > div > div.column.main > div.hero.hero--product-variant > div.hero__body.hero__body--inline--g > div > div > div > div.hero__content.hero__content--bottomer--g.hero__content--66pc--gt.hero__content--33pc--gtw > div > em';
  const result = !(el.window.document.querySelector(selector)?.textContent?? null === '제품이 현재 품절입니다');
  if(result){
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.MY_MAIL_ADDRESS,
        pass: process.env.MY_MAIL_PASSWORD
      }
    });

    // 메일 전송
    await transporter.sendMail({
      // 보내는 곳의 이름과, 메일 주소
      from: `"Austin" <${process.env.MY_MAIL_ADDRESS}>`,
      // 수신자 메일
      to: ['dhtjstlr777@gmail.com', 'dlrkdla4@naver.com'],
      // 보내는 메일 제목
      subject: '40mm 에어랩™ 롱 배럴(아이언/푸시아) 입고!!!',
      // 보내는 메일의 내용을 입력
      // text: 일반 text로 작성된 내용
      // html: html로 작성된 내용
      text: url,
    });
  }
} catch(e) {
  const url = 'https://www.dyson.co.kr/40mm-airwrap-long-barrel-iron-fuchsia';

  const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.MY_MAIL_ADDRESS,
    pass: process.env.MY_MAIL_PASSWORD
    }
  });

  // 메일 전송
  await transporter.sendMail({
    // 보내는 곳의 이름과, 메일 주소
    from: `"Austin" <${process.env.MY_MAIL_ADDRESS}>`,
    // 수신자 메일
    to: ['dhtjstlr777@gmail.com'],
    // 보내는 메일 제목
    subject: '정보수집 실패',
    // 보내는 메일의 내용을 입력
    // text: 일반 text로 작성된 내용
    // html: html로 작성된 내용
    text: url,
  });
  console.log('정보 수집에 실패했습니다.');
}
