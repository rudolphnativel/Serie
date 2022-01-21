package com.formation.serie;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {
        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("com.formation.serie");

        noClasses()
            .that()
            .resideInAnyPackage("com.formation.serie.service..")
            .or()
            .resideInAnyPackage("com.formation.serie.repository..")
            .should()
            .dependOnClassesThat()
            .resideInAnyPackage("..com.formation.serie.web..")
            .because("Services and repositories should not depend on web layer")
            .check(importedClasses);
    }
}
