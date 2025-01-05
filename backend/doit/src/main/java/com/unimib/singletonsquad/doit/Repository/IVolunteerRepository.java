package com.unimib.singletonsquad.doit.Repository;

import com.unimib.singletonsquad.doit.Domain.Volunteer;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Primary
@Repository
public interface IVolunteerRepository extends JpaRepository<Volunteer, Long> {

    // Metodi standard forniti da JpaRepository
    @Override
    Volunteer save(Volunteer volunteer); // Salva un volontario

    @Override
    Optional<Volunteer> findById(Long id); // Trova un volontario per ID

    @Override
    List<Volunteer> findAll(); // Trova tutti i volontari

    @Override
    void deleteById(Long id); // Elimina un volontario per ID

    @Override
    boolean existsById(Long id); // Verifica se esiste un volontario per ID

    // Metodi personalizzati per il nome e il cognome
    List<Volunteer> findByName(String name); // Trova tutti i volontari con un determinato nome

    List<Volunteer> findBySurname(String surname); // Trova tutti i volontari con un determinato cognome

    Optional<Volunteer> findByNameAndSurname(String name, String surname); // Trova un volontario per nome e cognome

    // Metodi personalizzati per l'email
    boolean existsByEmail(String email); // Verifica se esiste un volontario con una determinata email

    Optional<Volunteer> findByEmail(String email); // Trova un volontario per email

    Optional<Volunteer> findByEmailAndSurname(String email, String surname); // Trova un volontario per email e cognome

    boolean existsByEmailAndSurname(String email, String surname); // Verifica se esiste un volontario per email e cognome

    // Metodi personalizzati basati sull'ID
    Optional<Volunteer> findFirstByIdGreaterThan(Long id); // Trova il primo volontario con ID maggiore di un certo valore

    List<Volunteer> findByIdBetween(Long startId, Long endId); // Trova tutti i volontari con ID compreso tra due valori

    boolean existsByIdLessThan(Long id); // Verifica se esiste un volontario con ID inferiore a un determinato valore


}
