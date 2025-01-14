package com.unimib.singletonsquad.doit.domain.organization;

import com.unimib.singletonsquad.doit.utils.DataValidator;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@ToString
@Table(name = "organization")
public class Organization {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;
    @Column(unique = true, nullable = false)
    private String name;
    private String description;
    @Column(unique = true, nullable = false)
    private String email;
    private String password;
    private String website;
    private String VATNumber;
    private String role;//TODO REMOVE ?
    @ElementCollection
    @Column(name = "categories")
    private List<String> categories = new ArrayList<>();

    public void setEmail(String email) {
        if (!DataValidator.isValidEmail(email)) {
            throw new IllegalArgumentException("Email is not valid");
        }
        this.email = email;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Organization that)) return false;
        return Objects.equals(id, that.id) && Objects.equals(name, that.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }
}
