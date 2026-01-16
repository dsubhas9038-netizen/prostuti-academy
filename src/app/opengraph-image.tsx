// OpenGraph Image Generation
// Generates dynamic OG images for social sharing

import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'ProstutiAcademy - তোমার EXAM আমাদের প্রস্তুতি';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 50%, #EC4899 100%)',
                    fontFamily: 'system-ui, sans-serif',
                }}
            >
                {/* Background Pattern */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                        display: 'flex',
                    }}
                />

                {/* Content Container */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '40px',
                        textAlign: 'center',
                    }}
                >
                    {/* Logo Icon */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '120px',
                            height: '120px',
                            background: 'rgba(255, 255, 255, 0.2)',
                            borderRadius: '24px',
                            marginBottom: '30px',
                            fontSize: '64px',
                        }}
                    >
                        📚
                    </div>

                    {/* Title */}
                    <div
                        style={{
                            fontSize: '72px',
                            fontWeight: 'bold',
                            color: 'white',
                            marginBottom: '16px',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                            display: 'flex',
                        }}
                    >
                        ProstutiAcademy
                    </div>

                    {/* Bengali Tagline */}
                    <div
                        style={{
                            fontSize: '36px',
                            color: 'rgba(255, 255, 255, 0.95)',
                            marginBottom: '24px',
                            display: 'flex',
                        }}
                    >
                        তোমার EXAM আমাদের প্রস্তুতি
                    </div>

                    {/* Features */}
                    <div
                        style={{
                            display: 'flex',
                            gap: '20px',
                            marginTop: '20px',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                background: 'rgba(255, 255, 255, 0.15)',
                                padding: '12px 24px',
                                borderRadius: '30px',
                                color: 'white',
                                fontSize: '20px',
                            }}
                        >
                            📝 Question Bank
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                background: 'rgba(255, 255, 255, 0.15)',
                                padding: '12px 24px',
                                borderRadius: '30px',
                                color: 'white',
                                fontSize: '20px',
                            }}
                        >
                            🎯 Mock Tests
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                background: 'rgba(255, 255, 255, 0.15)',
                                padding: '12px 24px',
                                borderRadius: '30px',
                                color: 'white',
                                fontSize: '20px',
                            }}
                        >
                            📊 PYQ Analysis
                        </div>
                    </div>

                    {/* Bottom Badge */}
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            color: 'rgba(255, 255, 255, 0.8)',
                            fontSize: '24px',
                        }}
                    >
                        <span>🎓</span>
                        <span>West Bengal HS Arts - সম্পূর্ণ ফ্রি</span>
                        <span>🎓</span>
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
