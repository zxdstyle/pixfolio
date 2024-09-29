package constants

type PrivacyLevel int

var (
	PrivacyLow    = PrivacyLevel(0) // 低隐私
	PrivacyMiddle = PrivacyLevel(1) // 中等隐私
	PrivacyStrong = PrivacyLevel(2) // 强隐私
)
