const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!form.name || !form.email || !form.subject || !form.message) {
    return;
  }

  try {
    setStatus('loading');

    // Save to Supabase database
    const { error: dbError } = await supabase
      .from('contact_submissions')
      .insert([
        {
          name: form.name,
          company: form.company,
          email: form.email,
          phone: form.phone,
          subject: form.subject,
          message: form.message,
        },
      ]);

    if (dbError) {
      console.error('Database Error:', dbError);
      setStatus('error');
      return;
    }

    // Send email using Supabase Edge Function
    const { error: functionError } = await supabase.functions.invoke(
      'send-contact-email',
      {
        body: {
          full_name: form.name,
          company_name: form.company,
          email: form.email,
          phone: form.phone,
          subject: form.subject,
          message: form.message,
        },
      }
    );

    if (functionError) {
      console.error('Function Error:', functionError);
      setStatus('error');
      return;
    }

    setStatus('success');
    setForm(initialForm);

  } catch (err) {
    console.error('Unexpected Error:', err);
    setStatus('error');
  }
};
