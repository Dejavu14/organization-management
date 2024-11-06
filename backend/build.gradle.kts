plugins {
	id("java")
	id("org.springframework.boot") version "3.3.5"
	id("io.spring.dependency-management") version "1.1.6"
}

group = "com.example"
version = "0.0.1-SNAPSHOT"

java {
	toolchain {
		languageVersion.set(JavaLanguageVersion.of(21))
	}
}

repositories {
	mavenCentral()
}

dependencies {
	implementation("org.springframework.boot:spring-boot-starter")
	implementation("org.springframework.boot:spring-boot-starter-data-jpa")
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("org.springframework.boot:spring-boot-starter-security")
	implementation("org.springframework.boot:spring-boot-starter-logging")
	implementation("mysql:mysql-connector-java:8.0.32")
	implementation("jakarta.validation:jakarta.validation-api:3.0.0")
	implementation("org.hibernate:hibernate-validator:7.0.0.Final")
	implementation("jakarta.el:jakarta.el-api:6.0.1")
	implementation("org.slf4j:slf4j-api:2.0.0")
	implementation("ch.qos.logback:logback-classic:1.4.12")
	compileOnly("org.projectlombok:lombok:1.18.34")
	annotationProcessor("org.projectlombok:lombok:1.18.34")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	testImplementation("org.springframework.security:spring-security-test")
	testImplementation("org.junit.jupiter:junit-jupiter-engine")

	// Password encoder
	implementation("org.springframework.security:spring-security-crypto")

	// Kotlin dependencies
	implementation("org.jetbrains.kotlin:kotlin-reflect")
	implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
}

tasks.withType<Test> {
	useJUnitPlatform()
}
