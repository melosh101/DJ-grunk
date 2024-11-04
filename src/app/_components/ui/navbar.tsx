"use client"
import Image from "next/image";
import Link from "next/link";
export default function Navbar() {
    return (
        <header className="flex bg-primary">
                <Image src="/dj_grunk_logo.png" alt="logo" priority width={250} height={100} className="w-48"/>
                <Link href="/about">About</Link>
                <Link href="/services">Services</Link>
        </header>
    )
}