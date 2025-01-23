package com.unimib.singletonsquad.doit.security;

import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfiguration {

    private final AuthFilter customBearerTokenFilter;

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOriginPattern("http://localhost:[*]");
        configuration.addAllowedOriginPattern("https://lta-unimib.github.io");
        configuration.addAllowedMethod("*");
        configuration.addAllowedHeader("*");
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
    /*
        @Bean
        public CorsConfigurationSource corsConfigurationSource() {
            CorsConfiguration configuration = new CorsConfiguration();

            // Allow Next.js development server
            configuration.addAllowedOriginPattern("http://localhost:*");
            configuration.addAllowedOriginPattern("http://127.0.0.1:*");

            // Allow Next.js production deployments
            configuration.addAllowedOriginPattern("https://*.vercel.app");
            configuration.addAllowedOriginPattern("http://ec2-3-64-126-237.eu-central-1.compute.amazonaws.com");

            // Allow Capacitor Android app
            configuration.addAllowedOriginPattern("capacitor://localhost");
            configuration.addAllowedOriginPattern("http://localhost"); // For Android WebView

            // Allow methods and headers
            configuration.addAllowedMethod("*");
            configuration.addAllowedHeader("*");
            configuration.setAllowCredentials(true);

            // Expose headers that might be needed by your frontend
            configuration.addExposedHeader("Authorization");
            configuration.addExposedHeader("Content-Type");

            // Optional: Set max age for preflight requests
            configuration.setMaxAge(3600L);

            UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
            source.registerCorsConfiguration("/**", configuration);
            return source;
        }
        */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        return http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/login/**",
                                "/registration/**", "/authentication/**", "/request/test/**").permitAll()
                        .anyRequest().authenticated()
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
                )
                .addFilterBefore(customBearerTokenFilter, UsernamePasswordAuthenticationFilter.class)
                .formLogin(AbstractHttpConfigurer::disable)
                .httpBasic(AbstractHttpConfigurer::disable)
                .build();
    }
}