package com.unimib.singletonsquad.doit.domain.organization;

import com.unimib.singletonsquad.doit.domain.volunteer.VolunteerRequest;
import com.unimib.singletonsquad.doit.utils.data.DataValidator;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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
    @Email
    private String email;

    private String password;
    private String website;
    private String VATNumber;

    private String city;

    @ElementCollection
    @Column(name = "categories")
    @CollectionTable(
            name = "organization_categories",
            joinColumns = @JoinColumn(name = "organization_id")
    )
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<String> categories = new ArrayList<>();

    @OneToMany(mappedBy = "organization", cascade = CascadeType.ALL, orphanRemoval = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<VolunteerRequest> volunteerRequests = new ArrayList<>();

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
