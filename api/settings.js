export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { profile = 'standard' } = req.query;
  
  const sampleXml = `<?xml version="1.0" encoding="UTF-8"?>
<Settings>
  <version value="27" />
  <graphics>
    <ShadowQuality value="0" />
    <TextureQuality value="0" />
    <ParticleQuality value="0" />
    <WaterQuality value="0" />
    <GrassQuality value="0" />
    <ShaderQuality value="0" />
    <ReflectionQuality value="0" />
    <ReflectionMSAA value="0" />
    <SSAO value="0" />
    <AnisotropicFiltering value="0" />
    <MSAA value="0" />
    <MSAAFragments value="0" />
    <MSAAQuality value="0" />
    <CityDensity value="0.0" />
    <PedVarietyMultiplier value="0.0" />
    <VehicleVarietyMultiplier value="0.0" />
    <PostFX value="0" />
    <DoF value="false" />
    <MotionBlurStrength value="0.0" />
    <Tessellation value="0" />
    <LodScale value="0.6" />
    <PedLodBias value="0.0" />
    <VehicleLodBias value="0.0" />
  </graphics>
</Settings>`;

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.status(200).send(sampleXml);
}
