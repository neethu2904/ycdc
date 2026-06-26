<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Sign In | YCDC Portal</title>
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --plum-900: #23071b;
            --plum-800: #3b102f;
            --gold-500: #c49e6c;
            --gold-600: #a5804d;
            --silk-100: #faf7f2;
            --charcoal: #2c2c2c;
            --muted: #666666;
            --shadow-lg: 0 10px 30px rgba(0, 0, 0, 0.25);
            --transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Inter', sans-serif;
        }

        body {
            background: linear-gradient(135deg, var(--plum-900) 0%, var(--plum-800) 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .login-container {
            width: 100%;
            max-width: 420px;
            background-color: white;
            border-radius: 16px;
            box-shadow: var(--shadow-lg);
            overflow: hidden;
            border: 1px solid rgba(196, 158, 108, 0.2);
            animation: fadeIn 0.6s ease;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .login-header {
            padding: 40px 40px 20px;
            text-align: center;
        }

        .login-header h2 {
            font-family: 'Playfair Display', serif;
            font-size: 2.2rem;
            color: var(--plum-900);
            margin-bottom: 8px;
        }

        .login-header p {
            color: var(--muted);
            font-size: 0.9rem;
        }

        .login-form {
            padding: 20px 40px 40px;
        }

        .form-group {
            margin-bottom: 24px;
            text-align: left;
        }

        .form-label {
            display: block;
            font-size: 0.75rem;
            font-weight: 600;
            color: var(--plum-800);
            text-transform: uppercase;
            letter-spacing: 0.1em;
            margin-bottom: 8px;
        }

        .form-control {
            width: 100%;
            padding: 14px 16px;
            border-radius: 8px;
            border: 1px solid #eae4d8;
            outline: none;
            font-size: 0.95rem;
            background-color: #faf7f2;
            transition: var(--transition-smooth);
        }

        .form-control:focus {
            border-color: var(--gold-600);
            background-color: white;
            box-shadow: 0 0 0 3px rgba(196, 158, 108, 0.15);
        }

        .btn-submit {
            width: 100%;
            padding: 14px;
            background-color: var(--plum-800);
            color: white;
            font-size: 1rem;
            font-weight: 600;
            border-radius: 8px;
            border: none;
            cursor: pointer;
            transition: var(--transition-smooth);
            margin-top: 10px;
        }

        .btn-submit:hover {
            background-color: var(--plum-900);
            box-shadow: 0 4px 15px rgba(35, 7, 27, 0.3);
        }

        .error-message {
            background-color: #fcebeb;
            color: #c92c2c;
            padding: 12px 16px;
            border-radius: 8px;
            margin-bottom: 24px;
            font-size: 0.85rem;
            text-align: left;
            border-left: 4px solid #e53e3e;
        }

        .alert-info {
            background-color: #e8f4fd;
            color: #004b87;
            padding: 12px 16px;
            border-radius: 8px;
            margin-bottom: 24px;
            font-size: 0.85rem;
            text-align: left;
            border-left: 4px solid #0096ff;
        }
    </style>
</head>
<body>

    <div class="login-container">
        <div class="login-header">
            <h2>YCDC</h2>
            <p>Enter credentials to access admin panel</p>
        </div>

        <div class="login-form">
            @if($errors->any())
                <div class="error-message">
                    @foreach($errors->all() as $error)
                        <div>{{ $error }}</div>
                    @endforeach
                </div>
            @endif

            @if(session('error'))
                <div class="error-message">
                    {{ session('error') }}
                </div>
            @endif

            @if(session('success'))
                <div class="alert-info">
                    {{ session('success') }}
                </div>
            @endif

            <form action="{{ route('admin.login.post') }}" method="POST">
                @csrf
                <div class="form-group">
                    <label class="form-label" for="email">Email Address</label>
                    <input class="form-control" type="email" name="email" id="email" value="{{ old('email') }}" placeholder="admin@ycdc.com" required autocomplete="username">
                </div>

                <div class="form-group">
                    <label class="form-label" for="password">Password</label>
                    <input class="form-control" type="password" name="password" id="password" placeholder="••••••••" required autocomplete="current-password">
                </div>

                <button type="submit" class="btn-submit">Sign In</button>
            </form>
        </div>
    </div>

</body>
</html>
