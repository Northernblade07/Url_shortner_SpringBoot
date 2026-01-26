package com.url.shortner.repository;

import com.url.shortner.models.UrlMapping;
import com.url.shortner.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UrlMappingRepository extends JpaRepository<UrlMapping, UUID> {

    boolean existsByShortUrl(String shortUrl);
    UrlMapping findByShortUrl(String shortUrl);
    List<UrlMapping> findByUser(User user);
    UrlMapping findByShortUrlAndUserEmail(String shortUrl,String username);

}