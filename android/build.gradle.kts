java {
	toolchain {
		languageVersion.set(JavaLanguageVersion.of(11))
	}
}

kotlin {
	jvmToolchain {
		(this as JavaToolchainSpec).languageVersion.set(JavaLanguageVersion.of("11"))
	}
}
