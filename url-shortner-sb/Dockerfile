# =========================
# Build stage (Java 25)
# =========================
FROM eclipse-temurin:25-jdk AS build

WORKDIR /app

COPY mvnw ./
COPY .mvn/ .mvn/


RUN chmod +x mvnw

COPY pom.xml .
RUN ./mvnw -B dependency:go-offline

COPY src ./src
RUN ./mvnw -B clean package -DskipTests

# =========================
# Runtime stage (Java 25)
# =========================
FROM eclipse-temurin:25-jre

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java","-XX:MaxRAMPercentage=75","-jar","app.jar"]
