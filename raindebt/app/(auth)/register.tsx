import React, { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
} from "react-native";
import { Link, router } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import { useI18n } from "@/hooks/useI18n";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function RegisterScreen() {
  const { signUp } = useAuth();
  const { t } = useI18n();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleRegister = async () => {
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      setError(t("auth.fillAllFields"));
      return;
    }
    if (password !== confirmPassword) {
      setError(t("auth.passwordMismatch"));
      return;
    }
    if (password.length < 6) {
      setError(t("auth.passwordTooShort"));
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const { error: authError } = await signUp(email.trim(), password, {
        full_name: fullName.trim(),
      });
      if (authError) {
        setError(authError.message);
      } else {
        setSuccess(true);
      }
    } catch (e: any) {
      setError(e.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <View className="flex-1 justify-center items-center px-6 bg-[#F5F5F0]">
        <View className="w-16 h-16 rounded-full bg-[#4A9B6F] items-center justify-center mb-4">
          <Text className="text-3xl">✓</Text>
        </View>
        <Text className="text-xl font-bold text-[#1A1A1A] mb-2">
          {t("auth.accountCreated")}
        </Text>
        <Text className="text-sm text-[#6B7280] text-center mb-6">
          {t("auth.checkEmail")}
        </Text>
        <Link href="/(auth)/login" asChild>
          <Pressable className="bg-[#1B4D3E] rounded-xl px-6 py-3">
            <Text className="text-white font-semibold">{t("auth.backToLogin")}</Text>
          </Pressable>
        </Link>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 justify-center px-6 py-12">
          {/* Header */}
          <View className="items-center mb-8">
            <View className="w-16 h-16 rounded-2xl bg-[#1B4D3E] items-center justify-center mb-4">
              <Text className="text-3xl">🌧️</Text>
            </View>
            <Text className="text-2xl font-bold text-[#1A1A1A]">
              {t("auth.createAccount")}
            </Text>
            <Text className="text-sm text-[#6B7280] mt-1">
              {t("auth.registerSubtitle")}
            </Text>
          </View>

          {/* Error */}
          {error && (
            <View className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-4">
              <Text className="text-red-700 text-sm">{error}</Text>
            </View>
          )}

          {/* Form */}
          <View className="gap-4 mb-6">
            <Input
              label={t("auth.fullName")}
              placeholder="João Silva"
              value={fullName}
              onChangeText={setFullName}
              autoCapitalize="words"
              autoComplete="name"
            />
            <Input
              label={t("auth.email")}
              placeholder="email@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
            <Input
              label={t("auth.password")}
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <Input
              label={t("auth.confirmPassword")}
              placeholder="••••••••"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>

          <Button
            title={t("auth.signUp")}
            onPress={handleRegister}
            loading={loading}
          />

          {/* Login link */}
          <View className="flex-row justify-center mt-6">
            <Text className="text-sm text-[#6B7280]">
              {t("auth.hasAccount")}{" "}
            </Text>
            <Link href="/(auth)/login" asChild>
              <Pressable>
                <Text className="text-sm font-semibold text-[#1B4D3E]">
                  {t("auth.signIn")}
                </Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
