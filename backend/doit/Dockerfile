# Usa Maven con JDK 17 per costruire l'applicazione
FROM maven:3.9.2-eclipse-temurin-17 AS build

# Imposta la directory di lavoro per il build
WORKDIR /app

# Copia il file pom.xml e scarica le dipendenze
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copia il resto del progetto (es. src e altri file necessari)
COPY . .

# Compila il progetto e crea il file JAR
RUN mvn clean package -DskipTests

# Usa un'immagine leggera per eseguire l'applicazione
FROM eclipse-temurin:17-jre-alpine

# Imposta la directory di lavoro
WORKDIR /app

# Copia il file JAR dal container del build
COPY --from=build /app/target/DoIT-0.0.1-SNAPSHOT.jar app.jar

# Espone la porta 8080
EXPOSE 8080

# Comando per avviare l'applicazione
ENTRYPOINT ["java", "-jar", "app.jar"]
