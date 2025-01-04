package com.unimib.singletonsquad.doit.Domain;


import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

public class Organization {
    private String id;
    private String name;
    private String description;
    private ProfilePicture profilePicture;
    private String websiteUrl;
    private String logoUrl;
    private Map<SocialNetwork, String> socialNetworks;

    private Organization(Builder builder) {
        this.id = builder.id;
        this.name = builder.name;
        this.description = builder.description;
        this.profilePicture = builder.profilePicture;
        this.websiteUrl = builder.websiteUrl;
        this.logoUrl = builder.logoUrl;
        this.socialNetworks = new HashMap<>(builder.socialNetworks);
    }

    public static class Builder {
        private String id;
        private String name;
        private String description;
        private ProfilePicture profilePicture;
        private String websiteUrl;
        private String logoUrl;
        private Map<SocialNetwork, String> socialNetworks;

        public Builder id(String id) {
            this.id = id;
            return this;
        }

        public Builder name(String name) {
            this.name = name;
            return this;
        }

        public Builder description(String description) {
            this.description = description;
            return this;
        }

        public Builder profilePicture(ProfilePicture profilePicture) {
            this.profilePicture = profilePicture;
            return this;
        }

        public Builder websiteUrl(String websiteUrl) {
            this.websiteUrl = websiteUrl;
            return this;
        }

        public Builder logoUrl(String logoUrl) {
            this.logoUrl = logoUrl;
            return this;
        }

        public Builder addSocialNetwork(SocialNetwork network, String handle) {
            this.socialNetworks.put(network, handle);
            return this;
        }

        public Organization build() {
            // Validazione
            if (id == null || name == null) {
                throw new IllegalStateException("Id and name are required");
            }

            // Default values
            if (socialNetworks == null) {
                socialNetworks = new HashMap<>();
            }

            return new Organization(this);
        }
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ProfilePicture getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(ProfilePicture profilePicture) {
        this.profilePicture = profilePicture;
    }

    public String getWebsiteUrl() {
        return websiteUrl;
    }

    public void setWebsiteUrl(String websiteUrl) {
        this.websiteUrl = websiteUrl;
    }

    public String getLogoUrl() {
        return logoUrl;
    }

    public void setLogoUrl(String logoUrl) {
        this.logoUrl = logoUrl;
    }

    public Map<SocialNetwork, String> getSocialNetworks() {
        return socialNetworks;
    }

    public void setSocialNetworks(Map<SocialNetwork, String> socialNetworks) {
        this.socialNetworks = socialNetworks;
    }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof Organization that)) return false;
        return Objects.equals(id, that.id) && Objects.equals(name, that.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }

    public static void main(String[] args) {
        Organization organization = new Builder()
                .id("1")
                .name("Rotaract Abbiategrasso")
                .description("Associazione di volontariato locale")
                .build();

        System.out.println(organization.socialNetworks.get(SocialNetwork.INSTAGRAM));
    }
}
