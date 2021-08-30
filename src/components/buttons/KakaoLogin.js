import React from 'react';
import { withRouter } from 'react-router';
import '../../css/Button.css'

const KakaoLogin = () => {
	const kakaoUrl = "http://localhost:8080/oauth2/authorization/kakao?redirect_url=http://localhost:3000/login/oauth2/code/kakao";
	
	return (
			<a class="kakaoBtnLink" href={kakaoUrl}>
				<div className="kakaoBtn">
					<img src="/images/buttons/kakaologo.png" className="kakaoLogo"/>
					카카오로 로그인
				</div>
			</a>
	)
}

export default withRouter(KakaoLogin);