package com.url.shortner.repository;

import com.url.shortner.models.ClickEvent;
import com.url.shortner.models.UrlMapping;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface ClickEventRepository extends JpaRepository<ClickEvent , UUID> {

    List<ClickEvent> findByUrlMappingAndClickDateBetween(UrlMapping urlMapping, LocalDateTime startDate , LocalDateTime endDate);

//    this is used for finding clickevents of those urlmapping which passed according to uses from securityContext(inside Principal)
    List<ClickEvent> findByUrlMappingInAndClickDateBetween( List<UrlMapping> urlMappings, LocalDateTime startDate , LocalDateTime endDate);
}
