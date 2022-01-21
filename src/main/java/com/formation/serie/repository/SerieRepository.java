package com.formation.serie.repository;

import com.formation.serie.domain.Serie;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Serie entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SerieRepository extends JpaRepository<Serie, Long> {}
