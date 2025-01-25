# Utilizzare un'immagine di base di OpenJDK per eseguire l'applicazione
FROM openjdk:17-jdk-slim as build

# Definire la directory di lavoro nel container
WORKDIR /app

# Copiare il file pom.xml e scaricare le dipendenze
COPY pom.xml .
RUN mvn clean install -DskipTests

# Copiare tutto il codice sorgente nel container
COPY src /app/src

# Compilare il progetto e generare il jar
RUN mvn clean package -DskipTests

# Fase di runtime: eseguire il jar creato
FROM openjdk:17-jdk-slim

# Definire la directory di lavoro
WORKDIR /app

# Copiare il jar generato dalla fase di build
COPY --from=build /app/target/DoIT-0.0.1-SNAPSHOT.jar /app/DoIT.jar

# Esporre la porta su cui l'applicazione Spring Boot si eseguirà
EXPOSE 8080

# Eseguire il jar
ENTRYPOINT ["java", "-jar", "DoIT.jar"]
