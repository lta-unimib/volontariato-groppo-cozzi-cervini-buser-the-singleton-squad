package com.unimib.singletonsquad.doit.security;

public enum PublicPaths {

    FAVICON("/favicon.ico"),
    ERROR("/error"),
    REGISTRATION("/registration/**"),
    TEST_REQUEST("/request/test/**"),
    CATEGORIES("/categories/**"),
    LOGIN("/login/**");

    private final String path;

    PublicPaths(String path) {
        this.path = path;
    }

    public String getPath() {
        return path;
    }

    public boolean matches(String uri) {
        if (path.endsWith("/**")) {
            String prefix = path.substring(0, path.length() - 2);
            return uri.startsWith(prefix);
        }
        return uri.equals(path);
    }
}
