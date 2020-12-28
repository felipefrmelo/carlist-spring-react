FROM openjdk:12-alpine  as builder
COPY . .
RUN  ./mvnw package

FROM openjdk:12-alpine
ARG JAR_FILE=target/*.jar
COPY --from=builder ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]