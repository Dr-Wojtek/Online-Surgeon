package com.portfolio.OnlineSurgeonH2.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import static org.springframework.security.config.Customizer.withDefaults;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;



@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true, jsr250Enabled = true)
public class WebSecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests((requests) -> requests
                        .antMatchers("/").permitAll()
                        .anyRequest().authenticated()
                )
                .httpBasic(withDefaults());
        //For sending csrf-token through external cookie:
        http
                .csrf()
                    .csrfTokenRepository(
                            CookieCsrfTokenRepository.withHttpOnlyFalse()
                    );

        //For sending token through HTTP headers:
        /*http
                .addFilterAfter(new CsrfTokenResponseHeaderBindingFilter(), CsrfFilter.class);*/
        return http.build();
    }

    /*
    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring()
                // Ignore following URLs
                .antMatchers("/example");
    }
    */

    @Bean
    public UserDetailsService userDetailsService() {
        PasswordEncoder encoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
        UserDetails user =
                User
                        .withUsername("user")
                        .password(encoder.encode("password"))
                        .roles("USER")
                        .build();
        UserDetails admin =
                User
                        .withUsername(("admin"))
                        .password(encoder.encode("password"))
                        .roles("USER", "ADMIN")
                        .build();

        return new InMemoryUserDetailsManager(user, admin);
    }

}


