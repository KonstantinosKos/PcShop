package com.academic.PcShop;

import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

@SpringBootApplication
public class PcShopApplication {
    private static final String LOG_DIR = "logs/";
    private static final Logger logger = LoggerFactory.getLogger(PcShopApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(PcShopApplication.class, args);
    }

    @PostConstruct
    private static void init() {
        File logDir = new File(LOG_DIR);
        if (logDir.exists() && logDir.isDirectory()) {
            File[] files = logDir.listFiles();
            if (files != null) {
                for (File file : files) {
                    if (file.isFile() && file.getName().endsWith(".log")) {
                        try (FileWriter writer = new FileWriter(file, false)) {
                            // Open the file in write mode with 'false' to truncate it
                            writer.write(""); // Writing an empty string clears the file
                            logger.info("Cleared contents of: {}", file.getAbsolutePath());
                        } catch (IOException e) {
                            logger.error("Failed to clear contents of: {}", file.getAbsolutePath());
                        }
                    }
                }
            } else {
                logger.error("Failed to list files in directory: {}", logDir.getAbsolutePath());
            }
        } else {
            logger.error("Directory does not exist or is not a directory: {}", logDir.getAbsolutePath());
        }
    }

}
