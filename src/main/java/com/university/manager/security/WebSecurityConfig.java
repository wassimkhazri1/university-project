package com.university.manager.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/

import com.university.manager.security.jwt.AuthEntryPointJwt;
import com.university.manager.security.jwt.AuthTokenFilter;
import com.university.manager.security.services.UserDetailsServiceImpl;

@Configuration
@EnableMethodSecurity
public class WebSecurityConfig {
	@Autowired
	UserDetailsServiceImpl userDetailsService;

	@Autowired
	private AuthEntryPointJwt unauthorizedHandler;

	@Bean
	public AuthTokenFilter authenticationJwtTokenFilter() {
		return new AuthTokenFilter();
	}

	@Bean
	public DaoAuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();

		authProvider.setUserDetailsService(userDetailsService);
		authProvider.setPasswordEncoder(passwordEncoder());

		return authProvider;
	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
		return authConfig.getAuthenticationManager();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.csrf().disable().exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and().authorizeRequests()
				.requestMatchers("/api/auth/**").permitAll() // accès public pour l'authentification
				.requestMatchers("/api/user/**").hasRole("USER") // accès restreint par rôle
				.requestMatchers("/api/admin/**").hasRole("ADMIN") // accès restreint par rôle
				.requestMatchers("/api/auth/signout").authenticated().anyRequest().authenticated() // tous les autres
																									// endpoints
																									// nécessitent une
																									// authentification
				.and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and().logout()
				.disable(); // Disable default logout behavior
//	        .and()
//	        .logout()
//	        .logoutUrl("/api/auth/signout")
//	        .invalidateHttpSession(true)
//	        .deleteCookies("JSESSIONID");

		http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}

}
