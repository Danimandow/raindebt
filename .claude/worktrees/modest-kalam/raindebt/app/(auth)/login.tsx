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
import { theme } from "@/theme";

export default function LoginScreen() {
  const { signIn } = useAuth();
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError(t("auth.fillAllFields"));
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { error: authError } = await signIn(email.trim(), password);
      if (authError) {
        setError(authError.message);
      } else {
        router.replace("/(app)/(tabs)");
      }
    } catch (e: any) {
      setError(e.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

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
          {/* Logo / Header */}
          <View className="items-center mb-10">
            <View className="w-16 h-16 rounded-2xl bg-[#1B4D3E] items-center justify-center mb-4">
              <Text className="text-3xl">🌧️</Text>
            </View>
            <Text className="text-2xl font-bold text-[#1A1A1A]">RainDebt</Text>
            <Text className="text-sm text-[#6B7280] mt-1">
              {t("auth.loginSubtitle")}
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
              autoComplete="password"
            />
          </View>

          <Button
            title={t("auth.signIn")}
            onPress={handleLogin}
            loading={loading}
          />

          {/* Register link */}
          <View className="flex-row justify-center mt-6">
            <Text className="text-sm text-[#6B7280]">
              {t("auth.noAccount")}{" "}
            </Text>
            <Link href="/(auth)/register" asChild>
              <Pressable>
                <Text className="text-sm font-semibold text-[#1B4D3E]">
                  {t("auth.signUp")}
                </Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
