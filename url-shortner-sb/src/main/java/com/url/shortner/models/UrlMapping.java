package com.url.shortner.models;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
public class UrlMapping {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String originalUrl;
    private String shortUrl;
    private int clickCount=0;
    private LocalDateTime createdDate;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "urlMapping")
    private List<ClickEvent> clickEvents;
}
