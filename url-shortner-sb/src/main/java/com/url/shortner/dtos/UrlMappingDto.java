    package com.url.shortner.dtos;

    import lombok.Data;

    import java.time.LocalDateTime;
    import java.util.UUID;

    @Data
    public class UrlMappingDto {

        private UUID id;
        private String originalUrl;
        private String shortUrl;
        private int clickCount;
        private LocalDateTime createdAt;
        private String email;
    }
