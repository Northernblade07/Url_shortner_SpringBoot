package com.url.shortner.service;

import com.url.shortner.dtos.ClickEventDto;
import com.url.shortner.dtos.UrlMappingDto;
import com.url.shortner.models.ClickEvent;
import com.url.shortner.models.UrlMapping;
import com.url.shortner.models.User;
import com.url.shortner.repository.ClickEventRepository;
import com.url.shortner.repository.UrlMappingRepository;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class UrlMappingService {

    private final ClickEventRepository clickEventRepository;
    private final UrlMappingRepository urlMappingRepository;

    public UrlMappingService(ClickEventRepository clickEventRepository, UrlMappingRepository urlMappingRepository) {
        this.clickEventRepository = clickEventRepository;
        this.urlMappingRepository = urlMappingRepository;
    }

    public UrlMappingDto createShortUrl(String originalUrl , User user){

        String shortUrl;
        do {
            shortUrl = generateShortUrl();
        } while (urlMappingRepository.existsByShortUrl(shortUrl));

        UrlMapping urlMapping = new UrlMapping();

        urlMapping.setOriginalUrl(originalUrl);
        urlMapping.setShortUrl(shortUrl);
        urlMapping.setUser(user);
        urlMapping.setCreatedDate(LocalDateTime.now());
        UrlMapping savedUrlMapping = urlMappingRepository.save(urlMapping);
        return convertToDto(savedUrlMapping);
    }


    private UrlMappingDto convertToDto(UrlMapping urlMapping) {
        UrlMappingDto urlMappingDto = new UrlMappingDto();
        urlMappingDto.setId(urlMapping.getId());
        urlMappingDto.setOriginalUrl(urlMapping.getOriginalUrl());
        urlMappingDto.setShortUrl(urlMapping.getShortUrl());
        urlMappingDto.setEmail(urlMapping.getUser().getEmail());
        urlMappingDto.setCreatedAt(urlMapping.getCreatedDate());
        urlMappingDto.setClickCount(urlMapping.getClickCount());

        return urlMappingDto;
    }

    private String generateShortUrl() {
        String charaters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        Random random = new SecureRandom();
        StringBuilder shortUrl = new StringBuilder(8);

        for (int i = 0; i < 8; i++) {
            shortUrl.append(charaters.charAt(random.nextInt(charaters.length())));
        }

        return shortUrl.toString();
    }

    public List<UrlMappingDto> getUrlsByUser(User user){
        return urlMappingRepository.findByUser(user).stream().map(this::convertToDto).toList();
    }

    public List<ClickEventDto> getClickEventsByDate(String shortUrl , LocalDateTime start , LocalDateTime end , String email){
        UrlMapping urlMapping= urlMappingRepository.findByShortUrlAndUserEmail(shortUrl , email);

        System.out.println(urlMapping +"urlmapping................");
        if (urlMapping == null ||
                !urlMapping.getUser().getEmail().equals(email)) {
            return List.of();
        }
         return clickEventRepository.findByUrlMappingAndClickDateBetween(urlMapping , start , end).stream()
                 .collect(Collectors.groupingBy(click->click.getClickDate().toLocalDate() , Collectors.counting()))
                 .entrySet().stream()
                 .map(entry->{
                     ClickEventDto clickEventDto  = new ClickEventDto();
                     clickEventDto.setClickDate(entry.getKey());
                     clickEventDto.setCount(entry.getValue());
                     return clickEventDto;
                 }).collect(Collectors.toList());
    }


    public Map<LocalDate, Long> getTotalClicksByUserAndDate(User user , LocalDate start , LocalDate end){

        List<UrlMapping> urlMappings = urlMappingRepository.findByUser(user);
        List<ClickEvent> clickEvents = clickEventRepository.findByUrlMappingInAndClickDateBetween(urlMappings , start.atStartOfDay() , end.plusDays(1).atStartOfDay());
        return clickEvents.stream().collect(Collectors.groupingBy(click->click.getClickDate().toLocalDate() , Collectors.counting()));
    }

    public String getOriginal(String shortUrl){
        UrlMapping urlMapping = urlMappingRepository.findByShortUrl(shortUrl);
        if(urlMapping!=null){
            urlMapping.setClickCount(urlMapping.getClickCount()+1);
            urlMappingRepository.save(urlMapping);

            ClickEvent clickEvent = new ClickEvent();
            clickEvent.setClickDate(LocalDateTime.now());
            clickEvent.setUrlMapping(urlMapping);
            clickEventRepository.save(clickEvent);
            return urlMapping.getOriginalUrl();
        }
        return "";
    }
}
