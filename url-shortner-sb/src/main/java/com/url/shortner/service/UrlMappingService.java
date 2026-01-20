package com.url.shortner.service;

import com.url.shortner.Dtos.UrlMappingDto;
import com.url.shortner.models.UrlMapping;
import com.url.shortner.models.User;
import com.url.shortner.repository.UrlMappingRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
public class UrlMappingService {

    private final UrlMappingRepository urlMappingRepository;

    public UrlMappingService(UrlMappingRepository urlMappingRepository) {
        this.urlMappingRepository = urlMappingRepository;
    }

    public UrlMappingDto createShortUrl(String originalUrl , User user){
        String shortUrl = generateShortUrl();
        UrlMapping urlMapping = new UrlMapping();

        urlMapping.setOriginalUrl(originalUrl);
        urlMapping.setShortUrl(shortUrl);
        urlMapping.setUser(user);
        urlMapping.setCreatedDate(LocalDateTime.now());
        UrlMapping savedUrlMapping = urlMappingRepository.save(urlMapping);
        return convertoDto(savedUrlMapping);
    }


    private UrlMappingDto convertoDto(UrlMapping urlMapping) {
        UrlMappingDto urlMappingDto = new UrlMappingDto();
        urlMappingDto.setId(urlMapping.getId());
        urlMappingDto.setOriginalUrl(urlMapping.getOriginalUrl());
        urlMappingDto.setShortUrl(urlMapping.getShortUrl());
        urlMappingDto.setUsername(urlMapping.getUser().getUsername());
        urlMappingDto.setCreatedAt(urlMapping.getCreatedDate());
        urlMappingDto.setClickCount(urlMapping.getClickCount());

        return urlMappingDto;
    }

    private String generateShortUrl() {
        String charaters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        Random random = new Random();
        StringBuilder shortUrl = new StringBuilder(8);

        for (int i = 0; i < 8; i++) {
            shortUrl.append(charaters.charAt(random.nextInt(charaters.length())));
        }

        return shortUrl.toString();
    }

}
