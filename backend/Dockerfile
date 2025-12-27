# --- 1. Stage: Build (Maven + JDK) ---
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

# Protože je Dockerfile o úroveň výš než kód (ve složce backend),
# musíme kopírovat ze složky 'menza-api'.

# Nejprve zkopírujeme jen pom.xml pro stažení závislostí (využití cache)
COPY menza-api/pom.xml .
# Stažení závislostí (tento krok se nebude opakovat, pokud se nezmění pom.xml)
RUN mvn dependency:go-offline -B

# Nyní zkopírujeme zdrojový kód
COPY menza-api/src ./src

# Sestavení aplikace (přeskakujeme testy pro rychlejší build v Dockeru)
RUN mvn clean package -DskipTests

# --- 2. Stage: Run (pouze JRE) ---
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Vytvoření uživatele pro bezpečnost (aby aplikace neběžela pod rootem)
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

# Zkopírování výsledného JAR souboru z build stage
# Název souboru odpovídá artifactId a version v pom.xml
COPY --from=build /app/target/menza-api-0.0.1-SNAPSHOT.jar app.jar

# Exponování portu (Spring Boot defaultně běží na 8080)
EXPOSE 8080

# Spouštěcí příkaz
ENTRYPOINT ["java", "-jar", "app.jar"]