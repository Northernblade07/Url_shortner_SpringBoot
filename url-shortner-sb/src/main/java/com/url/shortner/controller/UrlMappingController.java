package com.url.shortner.controller;

import com.url.shortner.dtos.ClickEventDto;
import com.url.shortner.dtos.UrlMappingDto;
import com.url.shortner.models.User;
import com.url.shortner.service.UrlMappingService;
import com.url.shortner.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
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

    @PostMapping("/myUrl")
    @PreAuthorize("hasRole('USER')")
    public  ResponseEntity<List<UrlMappingDto>> getUserUrls(Principal principal){
        User user = userService.findByUsername(principal.getName());
        List<UrlMappingDto> urls = urlMappingService.getUrlsByUser(user);
        return ResponseEntity.ok(urls);
    }

    @GetMapping("/analytics/{shortUrl}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<ClickEventDto>> getUrlAnalytics(@PathVariable("shortUrl") String shortUrl,
                                                         @RequestParam("startDate") String startDate,
                                                         @RequestParam("endDate") String endDate,
                                                            Principal principal){

        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
        LocalDateTime start = LocalDateTime.parse(startDate , formatter);
        LocalDateTime end = LocalDateTime.parse(endDate , formatter);
        String username = principal.getName();

        List<ClickEventDto> clickEvents  = urlMappingService.getClickEventsByDate(shortUrl , start , end , username);
        return ResponseEntity.ok(clickEvents);

    }


    @GetMapping("/analytics/totalClicks")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Map<LocalDate, Long>> getUrlAnalytics(Principal principal ,
                                                                @RequestParam("startDate") String startDate ,
                                                                @RequestParam("endDate") String endDate){

        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE;
        User user = userService.findByUsername(principal.getName());
        LocalDate start = LocalDate.parse(startDate , formatter);
        LocalDate end = LocalDate.parse(endDate , formatter);

        Map<LocalDate , Long> totalClick = urlMappingService.getTotalClicksByUserAndDate(user , start , end);

        return ResponseEntity.ok(totalClick);


    }
}
