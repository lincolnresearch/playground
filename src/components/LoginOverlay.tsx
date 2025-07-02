import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Card, CardBody, CardHeader, Input, Button, Link} from "@heroui/react";
import {Icon} from "@iconify/react";
import {useSession} from "@/hooks/useSession";

const LoginOverlay: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isFormVisible, setIsFormVisible] = useState(false);
    const navigate = useNavigate();
    const {login} = useSession();

    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const token = localStorage.getItem(`venus.user`);
        if (token) {
            console.log("🚪 Already authenticated, heading to lounge...");
            navigate("/dashboard");
        }
    }, [])

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const userSession = await login(email, password);
            console.log("✅ Login complete:", userSession);
            navigate("/dashboard");
        } catch (err: any) {
            const message = err?.message || "Login failed. Please try again.";
            setErrorMessage(message);
        }

    };


    return (
        <div
            className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
            style={{
                backgroundImage: `url('/backgrounds/2713.jpg')`
            }}
        >
            <Card className="w-full max-w-md bg-background/70 backdrop-blur-md">
                <CardHeader className="flex gap-3">
                    <Icon icon="lucide:lock" className="text-primary text-xl"/>
                    <div className="flex flex-col">
                        <p className="text-md">Welcome back</p>
                        <p className="text-small text-default-500">Login to your account</p>
                    </div>
                </CardHeader>
                <CardBody>
                    {!isFormVisible ? (
                        <Button color="primary" fullWidth onPress={() => setIsFormVisible(true)}>
                            Log In
                        </Button>
                    ) : (
                        <form onSubmit={handleLogin} className="space-y-4">
                            <Input
                                label="Email"
                                type="email"
                                value={email}
                                onValueChange={setEmail}
                                placeholder="Enter your email"
                                startContent={<Icon icon="lucide:mail" className="text-default-400"/>}
                            />
                            <Input
                                label="Password"
                                type="password"
                                value={password}
                                onValueChange={setPassword}
                                placeholder="Enter your password"
                                startContent={<Icon icon="lucide:key" className="text-default-400"/>}
                            />
                            <div className="flex items-center justify-between">
                                <p className="w-full text-sm text-danger-500 bg-danger-100 px-3 py-2 rounded-md">
                                    {errorMessage}
                                </p>
                            </div>
                            <div className="flex items-center justify-between">
                                <Link href="#" size="sm">Forgot password?</Link>
                            </div>
                            <Button type="submit" color="primary" fullWidth>
                                Log In
                            </Button>
                        </form>
                    )}
                </CardBody>
                <CardHeader className="flex gap-3">
                    <Icon icon="lucide:user-check" className="text-primary text-xl"/>
                    <div className="flex flex-col">
                        <p className="text-md">Sign up</p>
                        <Link className="text-small text-default-500" href="/signup" size="sm">New member apply here</Link>
                    </div>
                </CardHeader>

            </Card>
        </div>
    );
};

export default LoginOverlay;
