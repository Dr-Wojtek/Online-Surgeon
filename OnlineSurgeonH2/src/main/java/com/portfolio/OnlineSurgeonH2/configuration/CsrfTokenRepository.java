package com.portfolio.OnlineSurgeonH2.configuration;

import org.springframework.security.web.csrf.CsrfToken;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

//Necessary for sending XSRF token through separate cookie
public interface CsrfTokenRepository {
    CsrfToken generateToken(HttpServletRequest request);

    void saveToken(CsrfToken token, HttpServletRequest request, HttpServletResponse response);

    CsrfToken loadToken(HttpServletRequest request);
}