package com.url.shortner.controller;

import com.url.shortner.Dtos.UrlMappingDto;
import com.url.shortner.models.UrlMapping;
import com.url.shortner.models.User;
import com.url.shortner.service.UrlMappingService;
import com.url.shortner.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping("/api/url")
@RequiredArgsConstructor
public class UrlMappingController {

    private final UrlMappingService urlMappingService;
    private final UserService userService;
    @PostMapping("/shorten")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<UrlMappingDto> createShortUrl(@RequestBody Map<String , String> request ,
                                                        Principal principal){

        String originalUrl = request.get("originalUrl");
        User user = userService.findByUsername(principal.getName());
        UrlMappingDto urlMappingDto = urlMappingService.createShortUrl(originalUrl , user);
        return  ResponseEntity.ok(urlMappingDto);
    }


}
