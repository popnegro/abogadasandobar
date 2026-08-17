const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined;

export function getFormspreeEndpoint(): string | undefined {
  return FORMSPREE_ENDPOINT?.trim() || undefined;
}

export interface FormspreeSubmissionResult {
  ok: boolean;
  error?: string;
}

export async function submitFormspree(
  payload: Record<string, string | boolean | undefined>
): Promise<FormspreeSubmissionResult> {
  if (!FORMSPREE_ENDPOINT) {
    return {
      ok: false,
      error: 'El canal de contacto no está configurado para este entorno.',
    };
  }

  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      let message = 'No fue posible enviar la consulta.';
      try {
        const data = await response.json() as { errors?: Array<{ message?: string }> };
        if (data.errors?.length) {
          message = data.errors.map(item => item.message).filter(Boolean).join(' ') || message;
        }
      } catch {
        // Keep generic message when Formspree does not return JSON.
      }
      if (response.status === 429) {
        message = 'Se alcanzó el límite temporal de envíos. Espere unos instantes e inténtelo nuevamente.';
      }
      return { ok: false, error: message };
    }

    return { ok: true };
  } catch {
    return { ok: false, error: 'No se pudo conectar con el servicio de contacto. Inténtelo nuevamente.' };
  }
}
