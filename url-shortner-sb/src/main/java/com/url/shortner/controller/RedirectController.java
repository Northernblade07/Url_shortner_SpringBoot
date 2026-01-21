package com.url.shortner.controller;

import com.url.shortner.models.UrlMapping;
import com.url.shortner.service.UrlMappingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class RedirectController {

    private final UrlMappingService urlMappingService;

    @GetMapping("/{shortUrl}")
    public ResponseEntity<Void> redirect(@PathVariable String shortUrl){

        String original = urlMappingService.getOriginal(shortUrl);
        if (original!=null){
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.add("Location" , original);
            return ResponseEntity.status(302).headers(httpHeaders).build();
        } else {
         return  ResponseEntity.notFound().build();
        }
    }

}
